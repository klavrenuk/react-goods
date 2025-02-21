import { useForm } from 'react-hook-form';
import { getRespErrorMessage } from '@/utils/errors';
import { useRouter } from 'next/router';

import type { Login } from '@/types/auth';

import {fakeToken} from '@/constants/api';


import api from '@/api';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = (data: Login) => {
    api({
      url: '/sign_in',
      method: 'POST',
      data: {
        "username": data.username,
        "password": data.password
      }
    }).then((response) => {

      console.log('response', response);

      const cookies = response.headers['set-cookie'];

      // костыль. Не смог получить куку. Подставил свою
      let token: string = fakeToken;

      if (!cookies) {
        alert('Нет доступа к куке');
      } else {
        token = cookies[0];
      }

      localStorage.setItem('token', token);
      router.push('/');

    }).catch((err) => {
      console.error('err', err);

      const message = getRespErrorMessage(err, 'Пользователь не найден');
      alert(message);
    })
  };

  return (
    <form
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Вход в систему</h2>

      <div className="mb-6">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Имя пользователя
        </label>
        <input
          type="text"
          id="username"
          placeholder="Введите ваше имя"
          className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
          {...register('username', {
            required: 'Имя пользователя обязательно',
            minLength: {
              value: 3,
              message: 'Имя должно быть не менее 3 символов',
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          placeholder="Введите ваш пароль"
          className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен быть не менее 6 символов',
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
      >
        Войти
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Еще нет аккаунта?{' '}
          <a href="/registration" className="text-blue-600 hover:text-blue-700 font-medium">
            Зарегистрируйтесь
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;