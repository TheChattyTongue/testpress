import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { quoteFormServices, site } from '@/data/content'
import { useQuoteDialog } from '@/context/QuoteDialogContext'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const forbidden = /["'<>\\/]/

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

export function QuoteDialog() {
  const { open, closeQuote } = useQuoteDialog()
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const reset = () => {
    setSubmitted(false)
    setErrors({})
  }

  const onOpenChange = (next: boolean) => {
    if (!next) {
      closeQuote()
      reset()
    }
  }

  const validate = (form: FormData) => {
    const next: Record<string, string> = {}
    const name = String(form.get('name') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const address = String(form.get('address') ?? '').trim()
    const details = String(form.get('details') ?? '').trim()

    if (name.length < 2 || forbidden.test(name)) {
      next.name =
        'Поле не должно быть короче 2 символов и не должно содержать ", \', <, >, \\ и /.'
    }

    const digits = phone.replace(/\D/g, '')
    const normalized =
      digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))
        ? digits.slice(1)
        : digits.length === 10
          ? digits
          : ''
    if (!normalized) {
      next.phone = 'Ожидаем 10 цифр, начиная с +7 или 8'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Пусто или неверный формат email'
    }

    if (address.length > 50 || forbidden.test(address)) {
      next.address =
        'Поле не должно быть длиннее 50 символов и не должно содержать ", \', <, >, \\ и /.'
    }

    if (details.length > 50 || forbidden.test(details)) {
      next.details =
        'Поле не должно быть длиннее 50 символов и не должно содержать ", \', <, >, \\ и /.'
    }

    return next
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSubmitted(true)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[min(100%-1.5rem,32rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl outline-none sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-bold text-slate-900">
                Анкета-заявка на расчёт
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-slate-600">
                Контактные данные и описание проекта
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-brand-muted p-6 text-center">
              <p className="text-lg font-semibold text-slate-900">
                Заявка принята
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Мы свяжемся с вами в рабочее время ({site.hours}).
              </p>
              <Button className="mt-4" onClick={() => onOpenChange(false)}>
                Закрыть
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={onSubmit}>
              <label className="block text-sm font-medium text-slate-700">
                ФИО
                <input
                  name="name"
                  className={cn(
                    'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20',
                    errors.name && 'border-red-400',
                  )}
                />
                <FieldError message={errors.name} />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Телефон
                <input
                  name="phone"
                  placeholder="+7 ..."
                  className={cn(
                    'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20',
                    errors.phone && 'border-red-400',
                  )}
                />
                <FieldError message={errors.phone} />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  name="email"
                  type="email"
                  className={cn(
                    'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20',
                    errors.email && 'border-red-400',
                  )}
                />
                <FieldError message={errors.email} />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Адрес
                <input
                  name="address"
                  className={cn(
                    'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20',
                    errors.address && 'border-red-400',
                  )}
                />
                <FieldError message={errors.address} />
              </label>

              <fieldset>
                <legend className="text-sm font-medium text-slate-700">
                  Требуется
                </legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {quoteFormServices.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        className="accent-brand"
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm font-medium text-slate-700">
                Подробности
                <textarea
                  name="details"
                  rows={3}
                  className={cn(
                    'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20',
                    errors.details && 'border-red-400',
                  )}
                />
                <FieldError message={errors.details} />
              </label>

              <Button type="submit" size="lg" className="w-full">
                Отправить сообщение
              </Button>

              <p className="text-xs leading-relaxed text-slate-500">
                Нажимая на кнопку, вы соглашаетесь с{' '}
                <a
                  href={site.privacyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Политикой обработки персональных данных
                </a>
                .
              </p>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
