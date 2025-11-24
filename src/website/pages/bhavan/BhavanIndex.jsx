



import PageMeta from '@/website/components/common/PageMeta';
import HeroSub from '@/website/components/HeroSub';

import BhavanForm from './BhavanForm';


const BhavanIndex = () => {
     const breadcrumbLinks = [
    { href: "/", text: "Bhavan" },
    { href: "/bhavan-form", text: "Bhavan Form" },
  ];
  return (
 <>
      <PageMeta title="Bhavan Form | Dhakshin Ekkam" />
      <HeroSub
        title="Bhavan Form"
        breadcrumbLinks={breadcrumbLinks}
      />
      <BhavanForm />
    </>
  )
}

export default BhavanIndex


