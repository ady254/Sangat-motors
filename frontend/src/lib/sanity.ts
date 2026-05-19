import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { servicesData, testimonialsData, faqsData, galleryData, Service, Testimonial, FAQ, GalleryItem } from "./cmsData";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (builder && source) {
    return builder.image(source).url();
  }
  return typeof source === "string" ? source : "";
}

// Data fetching helper functions (dual-mode: Sanity or Local Mock fallback)
export async function getServices(): Promise<Service[]> {
  if (!sanityClient) {
    return servicesData;
  }
  try {
    const query = `*[_type == "service"]{
      _id,
      title,
      description,
      icon,
      "image": image.asset->url,
      features
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : servicesData;
  } catch (error) {
    console.warn("Failed to fetch services from Sanity, using mock fallback:", error);
    return servicesData;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!sanityClient) {
    return testimonialsData;
  }
  try {
    const query = `*[_type == "testimonial"]{
      _id,
      name,
      role,
      rating,
      content,
      "image": image.asset->url
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : testimonialsData;
  } catch (error) {
    console.warn("Failed to fetch testimonials from Sanity, using mock fallback:", error);
    return testimonialsData;
  }
}

export async function getFAQs(): Promise<FAQ[]> {
  if (!sanityClient) {
    return faqsData;
  }
  try {
    const query = `*[_type == "faq"]{
      _id,
      question,
      answer
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : faqsData;
  } catch (error) {
    console.warn("Failed to fetch FAQs from Sanity, using mock fallback:", error);
    return faqsData;
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (!sanityClient) {
    return galleryData;
  }
  try {
    const query = `*[_type == "galleryItem"]{
      _id,
      title,
      "image": image.asset->url,
      category
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : galleryData;
  } catch (error) {
    console.warn("Failed to fetch gallery from Sanity, using mock fallback:", error);
    return galleryData;
  }
}
