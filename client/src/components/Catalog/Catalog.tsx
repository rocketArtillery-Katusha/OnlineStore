import classes from './catalog.module.scss';
import { AiOutlineUser } from 'react-icons/ai';
import reactIcons from '../../common/reactIcons';

const Catalog = () => {
    const { MdKeyboardArrowRight } = reactIcons.arrowIcons;
    return (
        <div className={classes.containerCatalog}>
            <ul>
                {reactIcons.catalogSections.map(({ catalogName, Icon }) =>
                    <li className={classes.section}>
                        <div>
                            <Icon />
                            <span>{catalogName}</span>
                        </div>
                        <MdKeyboardArrowRight />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Catalog