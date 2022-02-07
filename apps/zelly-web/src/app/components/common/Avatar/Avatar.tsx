import { useUserInfo } from '@zelly/core/hooks/useUserInfo';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  size?: AvatarSize;
}

export function Avatar({ size }: Props) {
  const { email } = useUserInfo();

  const parsedAvatar = email
    .split(' ')
    .map((n) => n[0])
    .join('.')
    .toUpperCase();

  function renderAvatar() {
    switch (size) {
      case 'xs':
        return (
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
            <span className="text-xs font-medium leading-none text-white">
              {parsedAvatar}
            </span>
          </span>
        );

      case 'sm':
        return (
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
            <span className="text-sm font-medium leading-none text-white">
              {parsedAvatar}
            </span>
          </span>
        );

      case 'md':
        return (
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
            <span className="font-medium leading-none text-white">
              {parsedAvatar}
            </span>
          </span>
        );

      case 'lg':
        return (
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500">
            <span className="text-lg font-medium leading-none text-white">
              {parsedAvatar}
            </span>
          </span>
        );

      case 'xl':
        return (
          <span className="inline-flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gray-500">
            <span className="text-xl font-medium leading-none text-white">
              {parsedAvatar}
            </span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gray-500">
            <span className="text-xl font-medium leading-none text-white">
              {parsedAvatar}
            </span>
          </span>
        );
    }
  }

  return renderAvatar();
}
