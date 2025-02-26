'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { FaPlay } from 'react-icons/fa';

import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

//* Define ListItemProps interface
interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

//* Define ListItem component
export const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const authModal = useAuthModal();
  const { user } = useUser();

  const onClick = () => {
    
    if (!user) {
      return authModal.onOpen();
    } else {
      router.push(href);
    }
  };

  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt={image} />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};
