import tempsEcoule from '@/utils/Date';

export default function Video(props) {
  return (
    <div key={props._id} className="rounded-lg overflow-hidden col-span-12 md:col-span-6 lg:col-span-4 relative " >
      <video controls className='h-64 w-full' >
        <source src={props.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute -right-1 top-2 flex flex-col items-end gap-2">
        {
          props.players.map((player, i) => <div key={i} className="badge badge-primary badge-sm">{player.name}</div>)
        }
      </div>
      <div className="flex items-center flex-wrap justify-between  mt-2">
        {
          props.tags.map((tag, i) => <div key={i} className="grow bg-gray-800 -mt-2 py-1 text-center text-white">{tag.name}</div>)
        }
      </div>
      <div className='flex items-center flex-wrap justify-between mt-2'>
        <span className='text-xl font-bold'>{props.title}</span>
        <small>{tempsEcoule(props.date)}</small>
      </div>
    </div>

  )
}
