'use client';

import React from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginSchema } from '@/lib/validations/auth';
import useLogin from '@/hooks/useLogin';
import type { LoginForm } from '@/types/auth.types';

const Login = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });
  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginForm) => mutate(data);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ background: 'var(--background)' }}>

      {/* Glow effect phía sau card */}
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--primary)' }} />

      <Card className="relative w-full max-w-sm border"
        style={{ background: 'var(--card)', borderColor: 'oklch(1 0 0 / 8%)' }}>

        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: 'var(--primary)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <CardTitle className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
            Welcome back
          </CardTitle>
          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
            Sign in to continue chatting
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">

              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="login-username"
                      placeholder="Enter your username"
                      autoComplete="username"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Button type="submit" className="w-full mt-2 font-semibold" disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign in'}
              </Button>

            </FieldGroup>
          </form>

          <p className="mt-5 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium hover:underline"
              style={{ color: 'var(--primary)' }}>
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;