FROM golang:alpine
WORKDIR /app
COPY . .
RUN go build -ldflags="-w -s" -o c4app
EXPOSE 80
CMD ["./c4app"]
