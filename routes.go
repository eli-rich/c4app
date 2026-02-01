package main

import (
	"fmt"
	"math/bits"

	"github.com/eli-rich/goc4/src/board"
	"github.com/eli-rich/goc4/src/cache"
	"github.com/eli-rich/goc4/src/engine"
	"github.com/eli-rich/goc4/src/util"
	"github.com/gofiber/fiber/v2"
)

var table = cache.NewTable(1 << 25)

type Move struct {
	History string `json:"history" xml:"history" form:"history"`
}

func startGame(c *fiber.Ctx) error {
	b := &board.Board{}
	b.Init(1)
	b.Move(util.ConvertCol('D'))
	return c.JSON(fiber.Map{
		"move": 'D',
	})
}

func place(c *fiber.Ctx) error {
	move := new(Move)
	if err := c.BodyParser(move); err != nil {
		return err
	}
	b := &board.Board{}
	b.Init(1)
	b.Load(move.History)
	fmt.Println(move.History)
	thread := make(chan uint8)
	go callEngine(b, thread)
	cmove := <-thread
	b.Move(cmove)
	pwin := board.CheckAlign(b.Bitboards[b.Turn])
	cwin := board.CheckAlign(b.Bitboards[b.Turn^1])
	return c.JSON(fiber.Map{
		"move": cmove,
		"pwin": pwin,
		"cwin": cwin,
	})
}

func callEngine(b *board.Board, thread chan uint8) {
	turnsPlayed := bits.OnesCount64(uint64(b.Bitboards[0] | b.Bitboards[1]))

	waitTime := min(turnsPlayed+2, 8)
	fmt.Printf("WAIT SECONDS: %d\n", waitTime)
	nodes := uint64(0)
	ctx := &engine.SearchContext{
		Table:      table,
		Nodes:      &nodes,
		TimeLimit:  float64(waitTime),
		DepthLimit: 0,
	}

	move, score, depthReached := engine.Root(b, ctx)

	board.Print(b)
	fmt.Printf("CPU Move: %c\n", util.ConvertColBack(move))
	if turnsPlayed <= int(BOOK_MAX_PLY) {
		fmt.Print("BOOK MOVE\n\n")
	} else {
		fmt.Printf("Score: %d\nDepth Reached: %d\n\n", score, depthReached)
	}

	thread <- move
}
