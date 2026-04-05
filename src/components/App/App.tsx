import { useEffect, useState } from 'react'
import css from './App.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { fetchNotes, deleteNote, createNote } from '../../services/noteService'
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useQuery, keepPreviousData, useMutation, useQueryClient } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination';
import type { NoteBody } from '../../types/note';
import useModalControl from '../../assets/hooks/ModalControl';



function App() {
  console.log("App rendered")
  const notify = () => toast.error('No notes found for your request.');
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const { isModalOpen, openModal, closeModal } = useModalControl()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  })

  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: async (newNote: NoteBody) => {
      const res = await createNote(newNote)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });

  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });

  const totalPages = data?.total_pages ?? 0;
  useEffect(() => {
    if (isSuccess && data.notes.length == 0) {
      console.log(data.notes)
      notify()
    }
  }, [data, isSuccess])

  const onNoteCreate = (newNote: NoteBody) => {
    closeModal()
    mutationCreate.mutate(newNote)
  }

  const onNoteDelete = async (id: string) => {
    mutationDelete.mutate(id)
  }

  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery)
    setCurrentPage(1)
  }



  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSubmit={handleSearch}></SearchBox>
          {isSuccess && totalPages > 1 &&
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}></Pagination>}
          <button className={css.button}
            onClick={() => openModal()}>Create note +</button>
        </header>
        <Toaster></Toaster>
        {isLoading && <Loader></Loader>}
        {isError && <ErrorMessage></ErrorMessage>}
        {data && data.notes.length > 0 && <NoteList onDelete={onNoteDelete} notes={data.notes}></NoteList>}
        {isModalOpen && <Modal onNoteSubmit={onNoteCreate} onClose={() => closeModal()}></Modal>}
      </div >
    </>
  )
}

export default App
