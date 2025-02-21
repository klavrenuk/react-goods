import React from 'react';
import { useForm } from 'react-hook-form';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Данные формы:', data);
    // Здесь можно добавить логику отправки данных на сервер
  };

  // Для проверки совпадения паролей
  const password = watch('password');

  return (
    <form
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Регистрация</h2>

      {/* Поле для имени */}
      <div className="mb-6">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Имя пользователя
        </label>
        <input
          type="text"
          id="username"
          placeholder="Введите ваше имя"
          className={`w-full px-4 py-2 border ${
            errors.username ? 'border-red-500' : 'border-gray-300'
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

      {/* Поле для email */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Введите ваш email"
          className={`w-full px-4 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Поле для пароля */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          placeholder="Введите ваш пароль"
          className={`w-full px-4 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
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

      {/* Поле для подтверждения пароля */}
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Подтвердите пароль
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Подтвердите ваш пароль"
          className={`w-full px-4 py-2 border ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
          {...register('confirmPassword', {
            required: 'Подтверждение пароля обязательно',
            validate: (value) =>
              value === password || 'Пароли не совпадают',
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
      >
        Зарегистрироваться
      </button>

      {/* Ссылка на вход */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Войдите
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;