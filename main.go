package main

import (
	"github.com/eli-rich/goc4/src/board"
	"github.com/gofiber/fiber/v2"
)

func main() {
	board.GenerateMasks()
	app := fiber.New()
	app.Static("/", "./client/dist")
	app.Post("/start", startGame)
	app.Post("/place", place)
	app.Listen("0.0.0.0:3000")
}
