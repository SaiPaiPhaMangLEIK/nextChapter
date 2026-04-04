"use client";

import { useState, useCallback } from "react";
import type { Book, ReadingStatus, ReadingProgress } from "@/types";
import { MOCK_BOOKS } from "@/lib/mock-data";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [loading, setLoading] = useState(false);

  const getBookById = useCallback(
    (id: string) => books.find((b) => b.id === id),
    [books]
  );

  const getBooksByStatus = useCallback(
    (status: ReadingStatus) => books.filter((b) => b.status === status),
    [books]
  );

  const updateProgress = useCallback(
    (bookId: string, progress: Partial<ReadingProgress>) => {
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id !== bookId) return book;
          const updated = {
            ...book,
            progress: {
              ...book.progress,
              ...progress,
              lastUpdated: new Date().toISOString(),
            } as ReadingProgress,
          };
          return updated;
        })
      );
    },
    []
  );

  const updateStatus = useCallback((bookId: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId
          ? {
              ...book,
              status,
              startedAt: status === "reading" ? new Date().toISOString() : book.startedAt,
              finishedAt: status === "finished" ? new Date().toISOString() : book.finishedAt,
            }
          : book
      )
    );
  }, []);

  const addBook = useCallback((book: Book) => {
    setBooks((prev) => [book, ...prev]);
  }, []);

  const removeBook = useCallback((bookId: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
  }, []);

  const currentlyReading = getBooksByStatus("reading");
  const wantToRead = getBooksByStatus("want_to_read");
  const finished = getBooksByStatus("finished");

  return {
    books,
    loading,
    currentlyReading,
    wantToRead,
    finished,
    getBookById,
    getBooksByStatus,
    updateProgress,
    updateStatus,
    addBook,
    removeBook,
    setLoading,
  };
}
