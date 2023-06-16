import Pagina from '@/components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import cursoValidator from '@/validators/cursoValidator'

const form = () => {

  const { push } = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()

  function salvar(dados) {
    const alunos = JSON.parse(window.localStorage.getItem('alunos')) || []
    alunos.push(dados)
    window.localStorage.setItem('alunos', JSON.stringify(alunos))
    push('/alunos')
  }

  return (
    <Pagina titulo="Alunos">

      <Form>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome: </Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', cursoValidator.nome)} />
          {
            errors.nome && 
            <small>{errors.nome.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="duracao">
          <Form.Label>Duração: </Form.Label>
          <Form.Control isInvalid={errors.duracao} type="text" {...register('duracao', cursoValidator.duracao)} />
          {
            errors.duracao && 
            <small>{errors.duracao.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="modalidade">
          <Form.Label>Modalidade: </Form.Label>
          <Form.Control isInvalid={errors.modalidade} type="text" {...register('modalidade', cursoValidator.modalidade)} />
          {
            errors.modalidade && 
            <small>{errors.modalidade.message}</small>
          }
        </Form.Group>

        <div className='text-center'>
          <Button variant="success" onClick={handleSubmit(salvar)}>
            <AiOutlineCheck className='me-1' />
            Salvar
          </Button>
          <Link href={'/alunos'} className="ms-2 btn btn-danger">
            <IoMdArrowRoundBack className='me-1' />
            Voltar
          </Link>
        </div>
      </Form>
    </Pagina>
  )
}

export default form