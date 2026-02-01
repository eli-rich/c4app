package main

import (
	"fmt"
	"log"
	"os"
	"runtime"
	"runtime/debug"
	"strconv"
	"sync"
	"sync/atomic"
	"time"

	"github.com/eli-rich/goc4/src/board"
	"github.com/eli-rich/goc4/src/book"
	"github.com/eli-rich/goc4/src/cache"
	"github.com/gofiber/fiber/v2"
)

const BOOK_PATH string = "./latest8.c4book"
const BOOK_MAX_PLY uint8 = 8

var (
	globalTable   atomic.Pointer[cache.Table]
	lastMoveTime  atomic.Int64
	initTableSize uint64
	resizeMu      sync.Mutex
)

func init() {
	// Cache entry size = 16 bytes
	// Total memory consumption (excluding proc overhead) = 16 * (1 << POWER)

	tableSizeStr := os.Getenv("GOC4_TABLE_POWER")
	if tableSizeStr == "" {
		tableSizeStr = "25" // modest default size
		log.Print("WARNING: no table size provided\n")
		log.Print("Falling back to default (1 << 25)\n\n")
	}

	power, err := strconv.ParseUint(tableSizeStr, 10, 64)
	if err != nil {
		log.Printf("WARNING: could not read table size: \"%s\"\n", tableSizeStr)
		log.Print("Falling back to default (1 << 25)\n")
		log.Printf("error: %v\n\n", err)
		power = 25
	}

	initTableSize = (1 << power)

	allocateBigTable()
	log.Printf("Total memory usage: %s\n\n", formatBytes(16*(1<<power)))

}

func main() {
	board.GenerateMasks()
	book.LoadBin(BOOK_PATH, BOOK_MAX_PLY)

	markActive()

	go func() {
		for range time.Tick(1 * time.Second) {
			last := time.Unix(0, lastMoveTime.Load())
			if time.Since(last) < 60*time.Second {
				continue
			}
			currentTable := globalTable.Load()
			if len(currentTable.Entries) < int(initTableSize) {
				continue
			}

			log.Println("Idle for 60m, freeing mem...")
			globalTable.Store(cache.NewTable(1 << 10))
			runtime.GC()
			debug.FreeOSMemory()
		}
	}()

	app := fiber.New()
	app.Static("/", "./client/dist")
	app.Post("/place", place)
	app.Listen("0.0.0.0:3000")
}

func markActive() {
	lastMoveTime.Store(time.Now().UnixNano())
}

func allocateBigTable() {
	globalTable.Store(cache.NewTable(initTableSize))
	log.Printf("Memory Woke Up: Allocated %s\n", formatBytes(16*int64(initTableSize)))
}

func formatBytes(b int64) string {
	const unit = 1024
	if b < unit {
		return fmt.Sprintf("%d B", b)
	}
	div, exp := int64(unit), 0
	for n := b / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}
	return fmt.Sprintf("%.1f %cB", float64(b)/float64(div), "KMGTPE"[exp])
}
