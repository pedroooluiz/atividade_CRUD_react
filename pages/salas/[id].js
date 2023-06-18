import Pagina from '@/components/Pagina'
import cursoValidator from '@/validators/cursoValidator'
import validatorSala from '@/validators/validatorSala'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
 
const form = () => { 

  const { push, query } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors }  } = useForm()

  useEffect(() => {
    
    if (query.id) {
      const salas = JSON.parse(window.localStorage.getItem('salas'))
      const sala = salas[query.id]

      for(let atributo in sala){
        setValue(atributo, sala[atributo]) 
      }
    }

  }, [query.id])

  function salvar(dados) {
    const salas = JSON.parse(window.localStorage.getItem('salas')) || []
    salas.splice(query.id, 1, dados)
    window.localStorage.setItem('salas', JSON.stringify(salas))
    push('/salas')
  }

  return (
    <Pagina titulo="Salas">
      <Form>
      <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome: </Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', cursoValidator.nome)} />
          {
            errors.nome && 
            <small>{errors.nome.message}</small>
          }
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="capacidade">
          <Form.Label>Capacidade: </Form.Label>
          <Form.Control isInvalid={errors.capacidade} type="text" {...register('capacidade', validatorSala.capacidade)} />
          {
            errors.capacidade && 
            <small>{errors.capacidade.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="tipo">
          <Form.Label>Tipo: </Form.Label>
          <Form.Control isInvalid={errors.tipo} type="text" {...register('tipo', validatorSala.tipo)} />
          {
            errors.tipo && 
            <small>{errors.tipo.message}</small>
          }
        </Form.Group>

        <div className='text-center'>
          <Button variant="success" onClick={handleSubmit(salvar)}>
            <AiOutlineCheck className='me-1' />
            Salvar
          </Button>
          <Link href={'/salas'} className="ms-2 btn btn-danger">
            <IoMdArrowRoundBack className='me-1' />
            Voltar
          </Link>
        </div>
      </Form>
    </Pagina>
  )
}

export default form