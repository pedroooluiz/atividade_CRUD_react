import Pagina from '@/components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import cursoValidator from '@/validators/cursoValidator'
import validatorProfessor from '@/validators/validatorProfessor'
import { mask } from 'remask'

const form = () => {

  const { push } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  function salvar(dados) {
    const professores = JSON.parse(window.localStorage.getItem('professores')) || []
    professores.push(dados)
    window.localStorage.setItem('professores', JSON.stringify(professores))
    push('/professores')
  }

  function handleChange(event) {
    setValue(event.target.name,
      (mask(event.target.value,
        event.target.getAttribute("mask"))))
  }

  return (
    <Pagina titulo="Professores">

      <Form>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome: </Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', cursoValidator.nome)} />
          {
            errors.nome &&
            <small>{errors.nome.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label>CPF: </Form.Label>
          <Form.Control isInvalid={errors.cpf} type="text" {...register('cpf', validatorProfessor.cpf)} mask="999.999.999-99" onChange={handleChange} />
          {
            errors.cpf &&
            <small>{errors.cpf.message}</small>
          }
        </Form.Group>


        <Form.Group className="mb-3" controlId="matricula">
          <Form.Label>Matrícula: </Form.Label>
          <Form.Control isInvalid={errors.matricula} type="text" {...register('matricula', validatorProfessor.matricula)} />
          {
            errors.matricula &&
            <small>{errors.matricula.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="salario">
          <Form.Label>Salario: </Form.Label>
          <Form.Control isInvalid={errors.salario} type="text" {...register('salario', validatorProfessor.salario)} mask="R$99999999999999" onChange={handleChange}/>
          {
            errors.salario &&
            <small>{errors.salario.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control isInvalid={errors.email} type="text" {...register('email', validatorProfessor.email)}  />
          {
            errors.email &&
            <small>{errors.email.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefone">
          <Form.Label>Telefone: </Form.Label>
          <Form.Control isInvalid={errors.telefone} type="text" {...register('telefone', validatorProfessor.telefone)}  mask="(99)99999-9999" onChange={handleChange}/>
          {
            errors.telefone &&
            <small>{errors.telefone.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="cep">
          <Form.Label>CEP: </Form.Label>
          <Form.Control isInvalid={errors.cep} type="text" {...register('cep', validatorProfessor.cep)}  mask="99999-999" onChange={handleChange}/>
          {
            errors.cep &&
            <small>{errors.cep.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="logradouro">
          <Form.Label>Logradouro: </Form.Label>
          <Form.Control isInvalid={errors.logradouro} type="text" {...register('logradouro', validatorProfessor.logradouro)} />
          {
            errors.logradouro &&
            <small>{errors.logradouro.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="complemento">
          <Form.Label>Complemento: </Form.Label>
          <Form.Control type="text" {...register('complemento', validatorProfessor.complemento)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numero">
          <Form.Label>Numero: </Form.Label>
          <Form.Control isInvalid={errors.numero} type="text" {...register('numero', validatorProfessor.numero)} />
          {
            errors.numero &&
            <small>{errors.numero.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="bairro">
          <Form.Label>Bairro: </Form.Label>
          <Form.Control isInvalid={errors.bairro} type="text" {...register('bairro', validatorProfessor.bairro)} />
          {
            errors.bairro &&
            <small>{errors.bairro.message}</small>
          }
        </Form.Group>

        <div className='text-center'>
          <Button variant="success" onClick={handleSubmit(salvar)}>
            <AiOutlineCheck className='me-1' />
            Salvar
          </Button>
          <Link href={'/professores'} className="ms-2 btn btn-danger">
            <IoMdArrowRoundBack className='me-1' />
            Voltar
          </Link>
        </div>
      </Form>
    </Pagina>
  )
}

export default form