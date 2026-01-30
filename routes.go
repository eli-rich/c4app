package main

import (
	"fmt"

	"github.com/eli-rich/goc4/src/board"
	"github.com/eli-rich/goc4/src/engine"
	"github.com/eli-rich/goc4/src/util"
	"github.com/gofiber/fiber/v2"
)

type Move struct {
	History string `json:"history" xml:"history" form:"history"`
}

func startGame(c *fiber.Ctx) error {
	b := &board.Board{}
	b.Init(1)
	b.Move(board.Column(util.ConvertCol('D')))
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
	thread := make(chan board.Column)
	go callEngine(b, thread, len(move.History))
	cmove := <-thread
	b.Move(cmove)
	pwin := board.CheckAlign(b.Bitboards[b.Turn])
	cwin := board.CheckAlign(b.Bitboards[b.Turn^1])
	board.Print(b)
	return c.JSON(fiber.Map{
		"move": cmove,
		"pwin": pwin,
		"cwin": cwin,
	})
}

func callEngine(b *board.Board, thread chan board.Column, turnNumber int) {
	waitTime := min(turnNumber+2, 7)
	fmt.Printf("WAIT SECONDS: %d\n", waitTime)
	thread <- engine.Root(b, float64(waitTime))
}
