import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

const IntroductionSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const email = 'hacokebu@gmail.com';
  
  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(email);
    toast({
      description: t('intro.section3.emailCopied'),
    });
  };

  const renderEmailText = () => {
    const text = t('intro.section3.description2');
    const parts = text.split('{email}');
    
    return (
      <>
        {parts[0]}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleCopyEmail}
                className="underline underline-offset-4 hover:text-ivory transition-colors cursor-pointer"
              >
                {email}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('intro.section3.emailTooltip')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {parts[1]}
      </>
    );
  };
  
  return (
    <section className="bg-background relative z-20" style={{ marginTop: '-72px' }}>
      <div className="container-main">
        {/* Section 01 */}
        <div className="py-[5rem]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="section-number shrink-0">01</div>
            <div className="flex-1 py-2">
              <p className="text-[2rem] leading-[2.8rem] text-secondary break-keep">
                {t('intro.section1.description')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Section 02 */}
        <div className="border-t border-ivory/50 py-[5rem]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="section-number shrink-0">02</div>
            <div className="flex-1 py-2">
              <p className="text-[2rem] leading-[2.8rem] text-secondary break-keep">
                {t('intro.section2.description')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Section 03 */}
        <div className="border-t border-ivory/50 py-[5rem]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <div className="section-number shrink-0">03</div>
            <div className="flex-1 py-2 space-y-4">
              <p className="text-[2rem] leading-[2.8rem] text-secondary break-keep">
                {t('intro.section3.description1')}
              </p>
              <p className="text-[2rem] leading-[2.8rem] text-secondary break-keep">
                {renderEmailText()}
              </p>
              <p className="text-[2rem] leading-[2.8rem] text-secondary break-keep">
                {t('intro.section3.description3')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed break-keep">
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
