import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { ref, remove, update } from 'firebase/database';
import { database } from '../../services/firebase';

import { Button } from '../Button';

import closeRoomImg from '../../assets/images/close-room.svg';
import deleteImg from '../../assets/images/delete.svg';

import './styles.scss';

type RoomModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roomId: string | undefined;
  questionId?: string;
};

export function RoomModal({
  modalIsOpen,
  setModalIsOpen,
  roomId,
  questionId,
}: RoomModalProps) {
  const navigate = useNavigate();

  async function handleEndRoom() {
    await update(ref(database, `rooms/${roomId}`), {
      endedAt: new Date(),
    });

    navigate('/');
  }

  async function handleDeleteQuestion() {
    setModalIsOpen(false);
    await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
  }

  return (
    <>
      { !questionId ? (
        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: {
              backgroundColor: '#060308cc',
            },

            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '590px',
              height: '362px',
              padding: 0,
            },
          }}
        >
          <div className="close-room">
            <img src={closeRoomImg} alt="Icone de encerrar" />
            <strong>Encerrar sala</strong>
            <p>Tem certeza que você deseja encerrar esta sala?</p>
            <div>
              <Button isCancel onClick={() => setModalIsOpen(false)}>
                Cancelar
              </Button>
              <Button isClose onClick={handleEndRoom}>
                Sim, encerrar
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: {
              backgroundColor: '#060308cc',
            },

            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '590px',
              height: '362px',
              padding: 0,
            },
          }}
        >
          <div className="close-room">
            <img src={deleteImg} alt="Icone de deletar" />
            <strong>Excluir pergunta</strong>
            <p>Tem certeza que você deseja excluir esta pergunta?</p>
            <div>
              <Button isCancel onClick={() => setModalIsOpen(false)}>
                Cancelar
              </Button>
              <Button isClose onClick={handleDeleteQuestion}>
                Sim, excluir
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
