import { useLang } from '../../context/LangContext';

const Error = ({ error }) => {
    const { t } = useLang();
    
    const message =
        typeof error === "string"
            ? error
            : error?.message || t('common.error');

    return (
        <div className="alert alert-danger my-5 text-center" role="alert">
            {message}
        </div>
    );
};

export default Error;
