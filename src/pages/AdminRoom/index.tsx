import { useNavigate, useParams } from 'react-router-dom';

import { useRoom } from '../../hooks/useRoom';

import { ref, remove, update } from 'firebase/database';
import { database } from '../../services/firebase';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';

import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';

import './styles.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const navigate = useNavigate();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    window.confirm('Tem certeza que você deseja encerrar esta sala?')  &&
    await update(ref(database, `rooms/${roomId}`), {
      endedAt: new Date(),
    });

    navigate('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    window.confirm('Tem certeza que você deseja excluir esta pergunta?')  &&
    await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId ? roomId : ''} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length}{' '}
              {questions.length === 1 ? 'pergunta' : 'perguntas'}
            </span>
          )}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => {handleDeleteQuestion(question.id)}}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
