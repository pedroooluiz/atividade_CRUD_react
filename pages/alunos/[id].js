import Pagina from '@/components/Pagina'
import cursoValidator from '@/validators/cursoValidator'
import validatorAluno from '@/validators/validatorAluno'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { mask } from 'remask'

const form = () => {

  const { push, query } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors }  } = useForm()

  useEffect(() => {

    if (query.id) {
      const alunos = JSON.parse(window.localStorage.getItem('alunos'))
      const aluno = alunos[query.id]

      for (let atributo in aluno) {
        setValue(atributo, aluno[atributo])
      }
    }

  }, [query.id]) 

  function salvar(dados) {
    const alunos = JSON.parse(window.localStorage.getItem('alunos')) || []
    alunos.splice(query.id, 1, dados)
    window.localStorage.setItem('alunos', JSON.stringify(alunos))
    push('/alunos')
  }

  function handleChange(event){
    setValue(event.target.name, 
      (mask(event.target.value, 
      event.target.getAttribute("mask"))))
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

        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label>CPF: </Form.Label>
          <Form.Control isInvalid={errors.cpf} type="text" {...register('cpf', validatorAluno.cpf)} mask="999.999.999-99" onChange={handleChange}  />
          {
            errors.cpf &&
            <small>{errors.cpf.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="matricula">
          <Form.Label>Matrícula: </Form.Label>
          <Form.Control isInvalid={errors.matricula} type="text" {...register('matricula', validatorAluno.matricula)} />
          {
            errors.matricula &&
            <small>{errors.matricula.message}</small>
          }
        </Form.Group>


        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control isInvalid={errors.email} type="text" {...register('email', validatorAluno.email)} />
          {
            errors.email &&
            <small>{errors.email.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefone">
          <Form.Label>Telefone: </Form.Label>
          <Form.Control isInvalid={errors.telefone} type="text" {...register('telefone', validatorAluno.telefone) } mask="(99)99999-9999" onChange={handleChange}/>
          {
            errors.telefone &&
            <small>{errors.telefone.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="cep">
          <Form.Label>CEP: </Form.Label>
          <Form.Control isInvalid={errors.cep} type="text" {...register('cep',validatorAluno.cep) }  mask="99999-999" onChange={handleChange}/>
          {
            errors.cep &&
            <small>{errors.cep.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="logradouro">
          <Form.Label>Logradouro: </Form.Label>
          <Form.Control isInvalid={errors.logradouro} type="text" {...register('logradouro', validatorAluno.logradouro)} />
          {
            errors.logradouro &&
            <small>{errors.logradouro.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="complemento">
          <Form.Label>Complemento: </Form.Label>
          <Form.Control type="text" {...register('complemento', validatorAluno.complemento)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numero">
          <Form.Label>Numero: </Form.Label>
          <Form.Control isInvalid={errors.numero} type="text" {...register('numero', validatorAluno.numero)} />
          {
            errors.numero &&
            <small>{errors.numero.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="bairro">
          <Form.Label>Bairro: </Form.Label>
          <Form.Control isInvalid={errors.bairro} type="text" {...register('bairro', validatorAluno.bairro)} />
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