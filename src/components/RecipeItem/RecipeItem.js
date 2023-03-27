import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './RecipeItem.module.scss';

const cx = classNames.bind(styles);

function RecipeItem({ data, handleRecipeItemClick }) {
    return (
        <div className={cx('wrapper')} onClick={(e) => handleRecipeItemClick(e, data)}>
            <Image className={cx('avatar')} src="" alt={data.title} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.title}</span>
                    {/* {data.account.activated && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />} */}
                </h4>
                <span className={cx('description')}>{data.briefDescription}</span>
            </div>
        </div>
    );
}

RecipeItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default RecipeItem;
