package main

import (
	"github.com/eli-rich/goc4/src/board"
	"github.com/eli-rich/goc4/src/book"
	"github.com/gofiber/fiber/v2"
)

const BOOK_PATH string = "./latest8.c4book"
const BOOK_MAX_PLY uint8 = 8

func main() {
	board.GenerateMasks()
	book.LoadBin(BOOK_PATH, BOOK_MAX_PLY)
	app := fiber.New()
	app.Static("/", "./client/dist")
	app.Post("/start", startGame)
	app.Post("/place", place)
	app.Listen("0.0.0.0:3000")
}
