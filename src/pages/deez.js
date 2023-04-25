
import Logo from '@/components/canvas/Logo'
// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here
export default function Deez(props) {
    return (
        <div className='absolute top-0 left-0'>
            <div className='h-screen'>deez</div>
            <div className='h-screen'>lol</div>
        </div>

    )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Deez.canvas = (props) => <Logo scale={0.5} route='/' position-y={-1} />
export async function getStaticProps() {
    return { props: { title: 'Index' } }
}
