'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchGraphQLDa, fetchGraphQl } from "@/app/api/graphicql";
import { GET_COUNT, GET_POSTS_QUERY_SINGLE } from "@/app/api/query";
import DetailPageSkeleton from "@/app/utilities/skeleton/DetailPageSkeleton";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { imgaeUrl } from "../utilities/ImagePath";
import Header from "./header";

function PostSingleData({postSingle,params}) {

    const {slug}=params
    const searchParams = useSearchParams()
    const [postesSingle,setPostesSingle]=useState(postSingle)
    const [loader,setLoader]=useState(true)
    const [catNo,setCatNo]=useState()
    const [postes,setPostes]=useState()
    const [offset,setOffset]=useState()
    
    let cateId=searchParams.get("catgoId")
    let scrollX=searchParams.get("scroll")
    
  
    const loadmore = async () =>{
      if(postSingle){
        setLoader(false)
      }
      
    }
    console.log(params,"uiyeuiewyue")
    const reload = async ()=>{
      let varSingle=  {
 
        "slug": slug,
        "AdditionalData": {
          "authorDetails": true,
          "memberProfile": false,
          "additionalFields": true,
          "categories": true
        },
        
        
      }









                      
      // { "slug":slug }
      let postSingle = await fetchGraphQLDa(GET_POSTS_QUERY_SINGLE,varSingle)
      console.log(postSingle,"ngfdkjkgd")
      setPostesSingle(postSingle)
      setLoader(false)
    }

    const countData = async (slug) =>{
      let varSingle = {"slug": slug}
      // {"entryId" :id}
      console.log(varSingle,"3733hgadh")
      let postCount = await fetchGraphQLDa(GET_COUNT,varSingle)
      
    }
    useEffect(()=>{
      countData()
    },[])
  console.log(countData(slug),"00090808080")
    useEffect(()=>{
      loadmore()
      reload()
    },[])
  console.log(postSingle,"gasjgsjd")
  
    const imageLoader = ({src}) => {
      return src
    }
//     let imageHtml

//    const parser = new DOMParser();
// const doc = parser.parseFromString(imageHtml, 'text/html');

// // Select all <img> tags in the document
// const images = doc.querySelectorAll('img');

// images.forEach((image) => {
//   image.remove(); // Remove each image from the document
// });

// // Serialize the modified DOM back to an HTML string
// const modifiedHtml = doc.body.innerHTML;
  // console.log(modifiedHtml,"dsgydsd")
//   const parser = new DOMParser();
// const doc = parser.parseFromString(imageHtml, 'text/html');
// const images = doc.querySelectorAll('img');
// console.log(images,"ghjgh")
// images.forEach((image, index) => {
//   if (index > 0) {
//     image.remove();
//   }
// });

// const parser =new DOMParser();
// const doc = parser.parseFromString(imageHtml, 'text/html');
// const images = doc.querySelectorAll('img');

// let imgHtml = '';
// if (images.length > 0) {
//   const firstImage = images[1]; // Select the first image
//   imgHtml += `<img src="${firstImage.src}" alt="${firstImage.alt}">`;
// }

// const updatedImageHtml = imgHtml;

// const updatedImageHtml = doc.body.innerHTML;
// console.log(updatedImageHtml,"8uudd")


const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
      if (isScriptLoaded) return;
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries';
      script.defer = true;
      script.async = true;
  
      script.onload = () => setIsScriptLoaded(true); 
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, [isScriptLoaded]);





  return (<>
  <Header catNo={catNo} setCatNo={setCatNo} setPostes={setPostes} setOffset={setOffset}/>
    {loader==true?<>
    
        <DetailPageSkeleton/>
        </>:
    <div className="container min-h-screen mx-auto max-w-screen-xl md:lg-0 px-4">

        <div className="my-10">
          

          <div className="flex justify-start flex-wrap items-center gap-x-4">
          <Link href={cateId==null?"/":`/?catgoId=${cateId}&scroll=${scrollX}`} ><img src="/img/back.svg" className="text-white"/></Link>
            <p className="text-base text-tag-color">{moment(postesSingle?.ChannelEntryDetail?.createdOn).format("MMMM DD, YYYY")}</p>
            <p className="text-base text-tag-color">{postesSingle?.ChannelEntryDetail?.readingTime} min read</p>
            <p className="text-base text-tag-color">views {postesSingle?.ChannelEntryDetail?.viewCount}</p>
            <a className="text-base text-primary">{postesSingle?.ChannelEntryDetail?.authorDetails?.FirstName}{" "}{postesSingle?.ChannelEntryDetail?.authorDetails?.LastName}</a>
           { postesSingle?.ChannelEntryDetail?.categories.length!=0&&postesSingle?.ChannelEntryDetail?.categories.map((data,ind)=>(
            <div className="px-2 py-1 text-base text-secondary bg-secondary rounded-md">{postesSingle?.ChannelEntryDetail?.categories[ind][0].categoryName}</div>))}
          </div>
          <div className="pl-8">
          <h1 className="sm:text-4xl text-3xl text-dark font-medium my-5">{postesSingle?.ChannelEntryDetail?.title}</h1>              
          
          {/* <div className="block my-5 w-full h-auto img-full"  dangerouslySetInnerHTML={{
            __html:updatedImageHtml}}> */}
              {/* <div className="block my-5">
              <Image
                loader={imageLoader}
                src={`${postesSingle?.ChannelEntryDetail?.coverImage==""?"/img/Default-image-layout.svg":postesSingle?.ChannelEntryDetail?.coverImage}`}
                alt="spurtCMS card image"
                width={10000}
                height={10000}
                priority
                className="he-image"
              />
          </div>   */}
          <p className="text-base font-normal text-grey desc" dangerouslySetInnerHTML={{
            __html:postesSingle?.ChannelEntryDetail?.description.replaceAll("<br>"," ")
          }}></p>
        
        </div>



        </div>

        

      </div>}
      </>
  )
}

export default PostSingleData