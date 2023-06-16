import Pagina from '@/components/Pagina'
import apiFilmes from '@/services/apiFilmes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'

const index = () => {

  const [cursos, setCursos] = useState([])

  useEffect(() => {
    setCursos(getAll())
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('alunos')) || []
  }

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const alunos = getAll()
      alunos.splice(id, 1)
      window.localStorage.setItem('alunos', JSON.stringify(alunos))
      setCursos(alunos)
    }
  }

  return (
    <Pagina titulo="Alunos">

      <Link href={'/alunos/form'} className="btn btn-primary mb-2" >Novo</Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Duração</th>
            <th>Modalidade</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((item, i) => (
            <tr key={i}>
              <td>
                <Link href={'/alunos/' + i}>
                  <BsFillPencilFill className='me-2 text-primary' />
                </Link>
                <AiOutlineDelete onClick={() => excluir(i)} className='text-danger' />
              </td>
              <td>{item.nome}</td>
              <td>{item.duracao}</td>
              <td>{item.modalidade}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}

export default index

