import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useJivoScript = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;

    switch (i18n.language) {
      case 'ru':
        script.src = '//code.jivosite.com/widget/22XKkye8kv';
        break;

      case 'en':
        script.src = '//code.jivosite.com/widget/22XKkye8kv';
        break;

      default:
        script.src = '//code.jivosite.com/widget/22XKkye8kv';
    }

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [i18n]);
};

export default useJivoScript;
