import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';

import { ref, get, child } from 'firebase/database';
import { database } from '../../services/firebase';

import illustrationImg from '../../assets/images/illustration.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import loginImg from '../../assets/images/login.svg';
import logoImg from '../../assets/images/logo.svg';

import '../../styles/auth.scss';

export function Home() {
  const [roomCode, setRoomCode] = useState('');

  const { user, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    
    navigate('/rooms/new');
    toast.success('Login realizado com sucesso!', {
      id: 'login',
    });
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await get(child(ref(database), `rooms/${roomCode}`));
      
    if (!roomRef.exists()) {
      toast.error('Essa sala não existe!');
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Essa sala foi fechada!');
      return;
    }

    if (roomRef.val().authorId === user?.id) {
      navigate(`/admin/rooms/${roomCode}`);
    } else {
      navigate(`/rooms/${roomCode}`);
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Illustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button 
            className="create-room" 
            onClick={handleCreateRoom}
          >
            <img 
              src={googleIconImg} 
              alt="Logo do Google" 
            />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em um sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <img src={loginImg} alt="Icone de login" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
