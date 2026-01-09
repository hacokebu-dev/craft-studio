import { useTranslation } from 'react-i18next';

const IntroductionSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-24 md:py-32 bg-background relative z-20" style={{ marginTop: '-72px' }}>
      <div className="container-main">
        <div className="space-y-24 md:space-y-32">
          {/* Section 01 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="section-number shrink-0">01</div>
            <div className="flex-1">
              <p className="text-lg md:text-xl text-ivory leading-relaxed">
                <span className="font-bold text-ivory">{t('intro.section1.title')}</span>
                <span className="text-muted-foreground text-sm ml-1">{t('intro.section1.pronunciation')}</span>
                <span className="text-secondary">{t('intro.section1.description')}</span>
              </p>
            </div>
          </div>
          
          {/* Section 02 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="section-number shrink-0">02</div>
            <div className="flex-1">
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                {t('intro.section2.description')}
              </p>
            </div>
          </div>
          
          {/* Section 03 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="section-number shrink-0">03</div>
            <div className="flex-1 space-y-4">
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                {t('intro.section3.description1')}
              </p>
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                {t('intro.section3.description2')}
              </p>
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                {t('intro.section3.description3')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('intro.section3.note')}
              </p>
              <div className="pt-4">
                <a
                  href="https://www.naver.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  {t('intro.section3.button')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
