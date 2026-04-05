import axios from "axios";
import type { Note, NoteBody } from "../types/note.ts"

const url = "https://notehub-public.goit.study/api/notes"

interface FetchedData {
    notes: Note[],
    totalPages: number,
}


export const fetchNotes = async (search: string, page: number) => {
    const results: FetchedData = (await axios.get<FetchedData>(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        },
        params: {
            search,
            page,
            perPage: 12
        }
    })).data
    return results
}

export const createNote = async ({ title, content, tag }: NoteBody) => {
    return (await axios.post<Note>(url, {
        title,
        content,
        tag
    }, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })).data
}

export const deleteNote = async (id: string) => {
    return (await axios.delete<Note>(`${url}/${id}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })).data
}