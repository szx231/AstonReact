import { useForm, Controller } from 'react-hook-form';

import { Input, Button, Select } from 'antd';

import { LockOutlined, UserOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';

import { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import s from './signUp.module.css';

import { placeholderText, validateRules, roleOptions } from './validateRules';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signUpRequest } from '../../../store/Authorization/SignUp';

import { notification } from '../../../helpers/Notification';

import { InputErrorMessage } from '../../../components/UI/InputErrorMessage';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { status, data, errorText } = useAppSelector((state) => state.signUpRequestSlice);
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (status === 'success') {
      notification('success', 'Учетная запись успешна зарегистрирована!');
      redirectToPage();
    }
    if (status === 'error') {
      notification('error', errorText);
    }
  }, [status]);

  const redirectToPage = () => {
    navigate(`/Mail`);
  };

  const onSubmit = (formData) => {
    dispatch(signUpRequest(formData));

    if (data) {
      reset();
    }
  };

  return (
    <div className={s.formContainer}>
      <form className={s.form}>
        <h4 className={s.formTitle}>Создание почтового ящика</h4>
        <MailOutlined style={{ fontSize: '26px', color: '#1677FF' }} />
        <div className={s.bioWrapp}>
          <div className={s.name}>
            <Controller
              render={({ field }) => (
                <Input
                  placeholder={placeholderText.name}
                  prefix={<UserOutlined />}
                  status={errors.name && 'error'}
                  {...field}
                />
              )}
              name="name"
              control={control}
              rules={validateRules.name}
            />
            <InputErrorMessage errors={errors.name} />
          </div>
          <div className={s.surname}>
            <Controller
              render={({ field }) => (
                <Input
                  placeholder={placeholderText.surname}
                  prefix={<UserOutlined />}
                  status={errors.surname && 'error'}
                  {...field}
                />
              )}
              name="surname"
              control={control}
              rules={validateRules.surname}
            />
            <InputErrorMessage errors={errors.surname} />
          </div>
        </div>
        <div>
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
        </div>
        <div>
          <Controller
            render={({ field }) => (
              <Input
                placeholder={placeholderText.email}
                prefix={<IdcardOutlined />}
                status={errors.email && 'error'}
                {...field}
              />
            )}
            name="email"
            control={control}
            rules={validateRules.email}
          />
          <InputErrorMessage errors={errors.email} />
        </div>
        <div>
          <Controller
            render={({ field }) => (
              <Select defaultValue={roleOptions[0].value} style={{ width: '100%' }} options={roleOptions} {...field} />
            )}
            defaultValue={roleOptions[0].value}
            name="role"
            control={control}
          />
        </div>
        {status === 'loading' ? (
          <Button type="primary" loading disabled>
            Загрузка
          </Button>
        ) : (
          <Button onClick={handleSubmit(onSubmit)} type="primary">
            Создать
          </Button>
        )}
      </form>
      <Link to="/Authorization/SignIn">
        <Button style={{ width: '100%' }} type="primary">
          уже есть аккаунт?
        </Button>
      </Link>
    </div>
  );
};

export default SignUp;
