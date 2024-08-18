import { useRouter } from 'next/router';

export const getPageName = () => {

    const router = useRouter();

    const pageName = router.pathname.replace(/\//g, '');

    return pageName;
}
