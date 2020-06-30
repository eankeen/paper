package main

import (
	"fmt"
	"html"
	"io"
	"log"
	"net/http"
	"os"
	"path"
	"runtime"
)

// type Status strut {}

type Store struct {
	Cards []Card `json:"card"`
}

type Card struct {
	Name   string `json:"name"`
	Status string `json:"status"`
}

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)

	http.HandleFunc("/store", func(w http.ResponseWriter, r *http.Request) {
		_, filename, _, ok := runtime.Caller(0)
		if !ok {
			fmt.Println("could not access stack")
			fmt.Fprintf(w, "there was an error")
			return
		}
		storePath := path.Join(path.Dir(filename), "store/store.json")
		storeFile, err := os.Open(storePath)
		if err != nil {
			fmt.Println(err)
			fmt.Fprintf(w, "there was an error")
			return
		}

		w.Header().Set("Content-Type", "application/json")
		io.Copy(w, storeFile)
		r.Body.Close()
	})

	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Helfdd33flo, %q", html.EscapeString(r.URL.Path))
	})

	log.Println("Lfistening on :3000...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
