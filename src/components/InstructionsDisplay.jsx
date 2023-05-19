import { useState } from 'react'
import styled, { css } from 'styled-components'

import { intro, instructions } from './instructions'

const getCookie = () => {
  const [match] = document.cookie.match(/completed=.*(;|$)/) || []

  if (!match) return 0

  const [, value] = match.split('=').map(str => str.trim().replace(';', ''))
  return Number(value)
}

const Container = styled.div`
  box-sizing: border-box;
  overflow: auto;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  max-width: 45%;
  max-height: 100%;
  padding: 16px 24px;
  background-color: #fff;
  box-shadow: 0 -5px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  a {
    color: #005230;
  }

  pre,
  code {
    overflow: auto;
    color: #008059;
    padding: 2px 4px;
    border-radius: 4px;
    background-color: #ededed;
    letter-spacing: 0.02rem;
  }

  > hr {
    margin: 32px 0;
  }

  > button {
    border: 0;
    background-color: transparent;
    padding: 0;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }

  > h3 {
    text-align: center;
  }

  > ul {
    list-style: none;
  }

  > ol,
  > ul {
    padding: 0 32px;

    > li {
      &:not(:last-child) {
        margin-bottom: 16px;
      }

      > label {
        > span {
          font-size: 1rem;
          cursor: pointer;
        }

        > ul {
          margin-top: 8px;
          > li {
            margin-bottom: 8px;
          }
        }

        > input {
          margin-right: 4px;
        }

        > input:checked ~ * {
          font-size: 0.5rem !important;
        }
      }
    }
  }
`

const DisplayInstructionsButton = styled.label(
  () => css`
    position: fixed;
    top: calc(50% - 16px);
    right: 0;
    padding: 24px 16px;
    background: black;
    color: white;
    font-weight: bold;
    cursor: pointer;

    > input {
      display: none;
    }

    &:has(input:not(:checked)) + ${Container} {
      right: -100%;
    }
  `,
)

const CloseButton = styled.label(
  () => css`
    padding: 8px;
    align-self: flex-end;
    font-weight: bold;
    cursor: pointer;
    box-sizing: border-box;
  `,
)
const InstructionsDisplay = () => {
  const [completed, setCompleted] = useState(getCookie())

  const handleCheck = ev => {
    setCompleted(c => {
      const comp = ev.target.checked ? c + 1 : c - 1
      document.cookie = `completed=${comp}`
      return comp
    })
  }

  return (
    <>
      <DisplayInstructionsButton htmlFor="instructions-checkbox">
        {'<'}
        <input type="checkbox" id="instructions-checkbox" defaultChecked />
      </DisplayInstructionsButton>
      <Container>
        <CloseButton htmlFor="instructions-checkbox">x</CloseButton>
        <h2>Instruções</h2>
        <>
          {intro}
          <hr />
          <h3>Exercícios:</h3>
          <p>
            Ao finalizar uma das tarefas, clique no check para aparecer a
            próxima:
          </p>
          <ol>
            {instructions.slice(0, completed + 1).map((instruction, index) => (
              <li key={`instruction-${index + 1}`}>
                <label htmlFor={`instruction-${index}`}>
                  <input
                    onChange={handleCheck}
                    type="checkbox"
                    id={`instruction-${index}`}
                    disabled={index < completed - 1}
                    checked={index < completed}
                  />
                  {instruction}
                </label>
              </li>
            ))}
          </ol>
          {instructions.length === completed && (
            <h3>Parabéns, você completou todas as atividades!!!! 🎉🍋</h3>
          )}
        </>
      </Container>
    </>
  )
}

export default InstructionsDisplay
