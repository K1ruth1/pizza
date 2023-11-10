

import React from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      <div>
        <input
          type="text"
          placeholder="Restaurant Name"
          {...register('restaurantName', { required: 'Restaurant Name is required' })}
        />
        {errors.restaurantName && <p>{errors.restaurantName.message}</p>}
      </div>
      <div>
        <input
          type="file"
          placeholder="Restaurant Image"
          {...register('restaurantImage', { required: 'Restaurant Image is required' })}
        />
        {errors.restaurantImage && <p>{errors.restaurantImage.message}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required', pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <input
          type="tel"
          placeholder="0700000000"
          {...register('number', { required: 'Phone number is required' })}
        />
        {errors.number && <p>{errors.number.message}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
