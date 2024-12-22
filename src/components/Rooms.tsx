import RoomDescription from '@/components/RoomSection';
import roomData from '../../public/assets/data/Rooms';
import Container from './common/Container';

const Rooms = () => {
    return (
        <div className='relative '>
            <Container style='py-8'>
                <h2 className="font-[family-name:var(--font-secondary)] text-sm font-medium uppercase tracking-wider text-foreground">
                    ROOMS
                </h2>
                <h3 className="md:w-2/4 font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-primary md:text-4xl">
                    Embracing the indigenous sprit
                    of Indonesia, with spacious and
                    relaxing experience
                </h3>
            </Container>
            {roomData.map((room, index) => (
                <RoomDescription key={index} {...room} />
            ))}
        </div>
    )
}

export default Rooms
