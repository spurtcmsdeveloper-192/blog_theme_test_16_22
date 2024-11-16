import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import PostSkeleton from '../utilities/skeleton/PostSkeleton'
import { fetchGraphQLDa } from '../api/graphicql'
import { GET_COUNT } from '../api/query'
import { imgaeUrl } from '../utilities/ImagePath'

function Post({postes,loader,catNo,setCatNo,setPostes,setOffset,scrollX}) {

const imageLoader = ({src}) => {
  return src
}

const countData = async (id) =>{
  let varSingle = {"id": id}
  // {"entryId" :id}
  let postCount = await fetchGraphQLDa(GET_COUNT,varSingle)
}
useEffect(()=>{
  countData()
},[])

const handleHomePage=()=>{
      setCatNo(null)
      setPostes([])
      setOffset(0)
}

const handleDescription=(data)=>{
  let imageHtml = data

  const parser = new DOMParser();
  const doc = parser.parseFromString(imageHtml, 'text/html');
  
  // Select all <img> tags in the document
  const images = doc.querySelectorAll('img');
  
  images.forEach((image) => {
    image.remove(); // Remove each image from the document
  });
  
  // Serialize the modified DOM back to an HTML string
  return doc.body.innerHTML;
}

// for(let i=0;i<postes.length;i++){
//   for(let j=1;j<postes.length;j++){
//     if(postes[i]!=postes[j])
//     {
//       console.log(postes,'asdasdasdasd');
//     }
//   }
// }

// const postesFilter = [...new Set(postes.map(JSON.stringify))].map(JSON.parse);

const imageHtml=
console.log(postes,'postesww');
  return (
   <>
   {loader==true?<>
   <PostSkeleton/></>:
        
         <>
         {postes?.length>0?
         <>
          {postes?.map((data,index)=>(
         <>{console.log(data,"datakokoko")}
         {((data?.coverImage==""))&&<>
       
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-16 gap-y-4">
          <div className="col-span-2 row-start-2 sm:row-start-1">
            <div className="flex justify-start flex-wrap items-center gap-x-4">
              <p className="text-xss text-tag-color text-current">{moment(data?.createdOn).format("MMMM DD, YYYY")}</p>
              <p className="text-xss text-tag-color text-current">{data?.readingTime} min read</p>
              <p className="text-xss text-tag-color text-current">views {data?.viewCount}</p>
              <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} className="text-xss text-primary" >{data?.authorDetails?.FirstName}{" "}{data?.authorDetails?.LastName}</Link>
              {data?.categories.map((catdata,ind)=>(<>
              {console.log(data.categories[ind][0].categoryName,"kufeyjdss")}
              <div className="px-2 py-1 text-xss text-secondary bg-secondary rounded-md">{data.categories[ind][0].categoryName}</div>
              </>))}
            </div>
            <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} className="block mt-2 mb-4 hover:underline" onClick={()=>countData(data?.id)}>
              <h1 className="text-3xxl text-dark font-medium leading-8">{data?.title}</h1>              
            </Link>
            <div className="text-base text-current font-light line-clamp-4 desc" dangerouslySetInnerHTML={{
            __html: handleDescription( data?.description?.replaceAll("<br>"," "))
          }}></div>
          </div>
          <div className="row-start-1 sm:row-start-1" key={data?.slug}>
            {console.log(data,"iyfuiyewu")}
            <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} onClick={()=>countData(data?.id)} >
              <Image
              // loader={imageLoader}
                src="/img/Default-image-layout.svg"
                alt="spurtCMS card image"
                // className="dark:invert"
                width={1000}
                height={1000}
                priority
                className='h-image'
              />
            </Link>
          </div>
        </div>
        <div className="border-b border-color block my-8"></div></>}
        {((data?.coverImage!=""))&&<>
        {console.log(data,"uytseyes")}
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-16 gap-y-4">
          <div className="col-span-2 row-start-2 sm:row-start-1">
            <div className="flex justify-start flex-wrap items-center gap-x-4">
              <p className="text-xss text-tag-color text-current">{moment(data?.createdOn).format("MMMM DD, YYYY")}</p>
              <p className="text-xss text-tag-color text-current">{data?.readingTime} min read</p>
              <p className="text-xss text-tag-color text-current">views {data?.viewCount}</p>
              <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} className="text-xss text-primary" >{data?.authorDetails?.FirstName}{" "}{data?.authorDetails?.LastName}</Link>
              {data?.categories?.map((catdata,ind)=>(<>
              <div className="px-2 py-1 text-xss text-secondary bg-secondary rounded-md">{data.categories[ind][0].categoryName}</div>
              </>))}
            </div>
            <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} className="block mt-2 mb-4 hover:underline" onClick={()=>countData(data?.id)}>
              <h1 className="text-3xxl text-dark font-medium leading-8">{data?.title}</h1>              
            </Link>
            <div className="text-base text-current font-light line-clamp-4 desc" dangerouslySetInnerHTML={{
            __html:handleDescription( data?.description?.replaceAll("<br>"," "))
          }}></div>
          </div>
          <div className="row-start-1 sm:row-start-1" key={data?.slug}>
            {console.log(data,"iyfuiyewu")}
            <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} onClick={()=>countData(data?.id)}>
              <Image
              loader={imageLoader}
                src={`${data?.coverImage}`}
                alt="spurtCMS card image"
                // className="dark:invert"
                width={1000}
                height={1000}
                priority
                className='h-image'
              />
            </Link>
          </div>
        </div>

        <div className="border-b border-color block my-8"></div></>}
        </>))}
        </>
        :
            <>
            <div className=" px-5 lg:px-20  py-32 col-span-full grid place-items-center">
                <div className="flex flex-col items-center max-w-[408px] ">
                    {/* <img src="\img\noData.svg" alt="nodata" className="dark:hidden" /> */}
                    <img
                        src="/img/nodatafilter.svg"
                        alt="nodata"
                    />
                    <h1 className=" text-2xl leading-6 font-medium text-black  mb-3 mt-6 text-center dark:dark:text-light-1">
                        {/* {search ? "No matching search results" : "No Listing Yet !"} */}
                        No Listing Yet !
                    </h1>
                    <Link href='/' onClick={()=>handleHomePage()} className='h-[2.5rem] grid place-items-center bg-black text-base text-white px-4 mt-4 rounded-md dark:bg-white dark:text-black'>Go to Home Page</Link>
                </div>
            </div>
            </>
        }
        </>
        }
   </>
  )
}

export default Post