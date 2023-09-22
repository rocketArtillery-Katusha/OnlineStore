import { BsCart2 } from 'react-icons/bs';
import { AiOutlineUser, AiFillCar } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { BiSolidTShirt } from 'react-icons/bi';
import { MdFastfood, MdKeyboardArrowRight } from 'react-icons/md';
import { ImBook } from 'react-icons/im';
import { PiSneakerBold } from 'react-icons/pi';

const reactIcons = {
    headerIcons: {
        RxHamburgerMenu,
        AiOutlineUser,
        BsCart2,
    },

    arrowIcons: {
        MdKeyboardArrowRight,
    },

    catalogSections: [
        { catalogName: 'Транспорт', Icon: AiFillCar },
        { catalogName: 'Электроника', Icon: HiOutlineDesktopComputer },
        { catalogName: 'Одежда', Icon: BiSolidTShirt },
        { catalogName: 'Еда', Icon: MdFastfood },
        { catalogName: 'Книги', Icon: ImBook },
        { catalogName: 'Обувь', Icon: PiSneakerBold },
    ]
}

export default reactIcons;