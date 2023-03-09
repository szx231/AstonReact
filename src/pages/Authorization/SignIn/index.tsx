import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'antd';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { placeholderText, validateRules } from './validateRules';
import { InputErrorMessage } from '../../../components/UI/InputErrorMessage';
import s from './signIn.module.css';
import { useGetUser } from '../../../hooks/useGetUser';
import { userIsAuth } from '../../../store/Authorization/CheckUserIsAuth';
import { useAppDispatch } from '../../../store/hooks';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    dispatch(userIsAuth(data));
    reset();
  };

  const title = useMemo(() => 'Авторизация', []);

  return (
    <div className={s.formContainer}>
      <form className={s.form}>
        <h4 className={s.formTitle}>{title}</h4>
        <GoogleOutlined style={{ fontSize: '26px', color: '#1677FF' }} />
        <Controller
          render={({ field }) => (
            <Input
              placeholder={placeholderText.email}
              prefix={<UserOutlined />}
              status={errors.email && 'error'}
              {...field}
            />
          )}
          name="email"
          control={control}
          rules={validateRules.email}
        />
        <InputErrorMessage errors={errors.email} />
        <Controller
          render={({ field }) => (
            <Input.Password
              placeholder={placeholderText.password}
              prefix={<LockOutlined />}
              status={errors.password && 'error'}
              {...field}
            />
          )}
          name="password"
          control={control}
          rules={validateRules.password}
        />
        <InputErrorMessage errors={errors.password} />
        <Button onClick={handleSubmit(onSubmit)} type="primary">
          Войти
        </Button>
      </form>
      <Link to="/Authorization/SignUp">
        <Button style={{ width: '100%' }} type="primary">
          Зарегистрировать
        </Button>
      </Link>
    </div>
  );
};

export default SignIn;
