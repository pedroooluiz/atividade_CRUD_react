import Pagina from '@/components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import cursoValidator from '@/validators/cursoValidator'
import validatorSemestre from '@/validators/validatorSemestre'
import { mask } from 'remask'

const form = () => {

  const { push, query } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  useEffect(() => {

    if (query.id) {
      const semestres = JSON.parse(window.localStorage.getItem('semestres'))
      const semestre = semestres[query.id]

      for (let atributo in semestre) {
        setValue(atributo, semestre[atributo])
      }
    }

  }, [query.id])

  function salvar(dados) {
    const semestres = JSON.parse(window.localStorage.getItem('semestres')) || []
    semestres.splice(query.id, 1, dados)
    window.localStorage.setItem('semestres', JSON.stringify(semestres))
    push('/semestres')
  }
  function handleChange(event) {
    setValue(event.target.name,
      (mask(event.target.value,
        event.target.getAttribute("mask"))))
  }

  return (
    <Pagina titulo="Semestres">
      <Form>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome: </Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', cursoValidator.nome)} />
          {
            errors.nome &&
            <small>{errors.nome.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="dataInicio">
          <Form.Label>Data de Inicio: </Form.Label>
          <Form.Control isInvalid={errors.dataInicio} type="text" {...register('dataInicio', validatorSemestre.dataInicio)}  mask="99/99/999" onChange={handleChange}/>
          {
            errors.dataInicio &&
            <small>{errors.dataInicio.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="dataFim">
          <Form.Label>Data de Término: </Form.Label>
          <Form.Control isInvalid={errors.dataFim} type="text" {...register('dataFim', validatorSemestre.dataFim)} mask="99/99/999" onChange={handleChange}/>
          {
            errors.dataFim &&
            <small>{errors.dataFim.message}</small>
          }
        </Form.Group>

        <div className='text-center'>
          <Button variant="success" onClick={handleSubmit(salvar)}>
            <AiOutlineCheck className='me-1' />
            Salvar
          </Button>
          <Link href={'/semestres'} className="ms-2 btn btn-danger">
            <IoMdArrowRoundBack className='me-1' />
            Voltar
          </Link>
        </div>
      </Form>
    </Pagina>
  )
}

export default form