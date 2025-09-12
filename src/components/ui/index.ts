import { lazy } from 'react';

// Utils
export { cn } from '@/lib/utils';

// Lazy loaded components
export const Accordion = lazy(() => import('./accordion').then(mod => ({ default: mod.Accordion })));
export const AccordionContent = lazy(() => import('./accordion').then(mod => ({ default: mod.AccordionContent })));
export const AccordionItem = lazy(() => import('./accordion').then(mod => ({ default: mod.AccordionItem })));
export const AccordionTrigger = lazy(() => import('./accordion').then(mod => ({ default: mod.AccordionTrigger })));

export const Alert = lazy(() => import('./alert').then(mod => ({ default: mod.Alert })));
export const AlertDescription = lazy(() => import('./alert').then(mod => ({ default: mod.AlertDescription })));
export const AlertTitle = lazy(() => import('./alert').then(mod => ({ default: mod.AlertTitle })));

export const Avatar = lazy(() => import('./avatar').then(mod => ({ default: mod.Avatar })));
export const AvatarFallback = lazy(() => import('./avatar').then(mod => ({ default: mod.AvatarFallback })));
export const AvatarImage = lazy(() => import('./avatar').then(mod => ({ default: mod.AvatarImage })));

export const Button = lazy(() => import('./button').then(mod => ({ default: mod.Button })));

export const Card = lazy(() => import('./card').then(mod => ({ default: mod.Card })));
export const CardContent = lazy(() => import('./card').then(mod => ({ default: mod.CardContent })));
export const CardDescription = lazy(() => import('./card').then(mod => ({ default: mod.CardDescription })));
export const CardFooter = lazy(() => import('./card').then(mod => ({ default: mod.CardFooter })));
export const CardHeader = lazy(() => import('./card').then(mod => ({ default: mod.CardHeader })));
export const CardTitle = lazy(() => import('./card').then(mod => ({ default: mod.CardTitle })));

export const Dialog = lazy(() => import('./dialog').then(mod => ({ default: mod.Dialog })));
export const DialogContent = lazy(() => import('./dialog').then(mod => ({ default: mod.DialogContent })));
export const DialogDescription = lazy(() => import('./dialog').then(mod => ({ default: mod.DialogDescription })));
export const DialogFooter = lazy(() => import('./dialog').then(mod => ({ default: mod.DialogFooter })));
export const DialogHeader = lazy(() => import('./dialog').then(mod => ({ default: mod.DialogHeader })));
export const DialogTitle = lazy(() => import('./dialog').then(mod => ({ default: mod.DialogTitle })));
export const DialogTrigger = lazy(() => import('./dialog').then(mod => ({ default: mod.DialogTrigger })));

export const Input = lazy(() => import('./input').then(mod => ({ default: mod.Input })));
export const Label = lazy(() => import('./label').then(mod => ({ default: mod.Label })));

export const Select = lazy(() => import('./select').then(mod => ({ default: mod.Select })));
export const SelectContent = lazy(() => import('./select').then(mod => ({ default: mod.SelectContent })));
export const SelectItem = lazy(() => import('./select').then(mod => ({ default: mod.SelectItem })));
export const SelectTrigger = lazy(() => import('./select').then(mod => ({ default: mod.SelectTrigger })));
export const SelectValue = lazy(() => import('./select').then(mod => ({ default: mod.SelectValue })));

export const Textarea = lazy(() => import('./textarea').then(mod => ({ default: mod.Textarea })));
export const Toast = lazy(() => import('./toast').then(mod => ({ default: mod.Toast })));

// Commonly used components that should load immediately
export { Spinner } from './spinner';

// Enhanced components for better UX
export { LoadingSpinner, LoadingState, SkeletonCard, ProgressLoading } from './loading-states';
export { ToastProvider, useToast } from './toast-notifications';
export { ErrorBoundary, useErrorHandler } from './error-boundary'; 