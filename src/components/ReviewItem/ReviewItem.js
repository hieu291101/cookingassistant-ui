import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './ReviewItem.module.scss';
import moment from 'moment/moment';


const cx = classNames.bind(styles);

function RecipeItem({ data }) {
    console.log(data)
    return (
        <div className={cx('wrapper')} key={data.recipeReviewId}>
            <Image className={cx('avatar')} src="" alt={data.photoPath} />
            <div className={cx('info')}>
                <h4 className={cx('heading')}>
                    <span className={cx('name')}>{data.name }</span>
                    <span className={cx('time')}>{moment(data.createdDate).fromNow()}</span>
                </h4>
                <span className={cx('description')}>{data.reviewText}</span>
            </div>
        </div>
    );
}

RecipeItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default RecipeItem;
