import Pagina from '@/components/Pagina'
import apiFilmes from '@/services/apiFilmes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'

const index = () => {
 
  const [semestres, setSemestres] = useState([])

  useEffect(() => {
    setSemestres(getAll())
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('semestres')) || []
  }

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const semestres = getAll()
      semestres.splice(id, 1)
      window.localStorage.setItem('semestres', JSON.stringify(semestres))
      setSemestres(semestres)
    }
  }

  return (
    <Pagina titulo="Semestres">

      <Link href={'/semestres/form'} className="btn btn-primary mb-2" >Novo</Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data Inicio</th>
            <th>Data Término</th>
          </tr>
        </thead>
        <tbody>
          {semestres.map((item, i) => (
            <tr key={i}>
              <td>
                <Link href={'/semestres/' + i}>
                  <BsFillPencilFill className='me-2 text-primary' />
                </Link>
                <AiOutlineDelete onClick={() => excluir(i)} className='text-danger' />
              </td>
              <td>{item.nome}</td>
              <td>{item.dataInicio}</td>
              <td>{item.dataFim}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}

export default index

