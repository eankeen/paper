package main

import (
	"fmt"
	"io"
	"io/ioutil"
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

	http.HandleFunc("/api/set", func(w http.ResponseWriter, r *http.Request) {
		_, filename, _, ok := runtime.Caller(0)
		if !ok {
			fmt.Println("could not access stack")
			fmt.Fprintf(w, "there was an error")
		}
		storePath := path.Join(path.Dir(filename), "store/store.json")
		// storeFile, err := os.Open(storePath)
		// if err != nil {
		// 	fmt.Println(err)
		// 	fmt.Fprintf(w, "there was an error opening the file")
		// 	return
		// }

		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			panic(err)
		}
		// str := string(b)
		// fmt.Println(str)
		ioutil.WriteFile(storePath, b, 0644)
		return
	})

	http.HandleFunc("/api/store", func(w http.ResponseWriter, r *http.Request) {
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

	log.Println("on :3001...")
	err := http.ListenAndServe(":3001", nil)
	if err != nil {
		log.Fatal(err)
	}
}
