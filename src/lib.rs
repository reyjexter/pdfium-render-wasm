mod utils;

#[cfg(target_arch = "wasm32")]
use pdfium_render::prelude::*;

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

use web_sys::Blob;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub async fn read_pdf_links(blob: Blob) {
    let pdfium = Pdfium::new(
        Pdfium::bind_to_system_library().unwrap()
    );

    let document = pdfium.load_pdf_from_blob(blob, None).await.unwrap();

    log::info!("PDF version: {:?}", document.version());

    document
        .pages()
        .iter()
        .enumerate()
        .for_each(|(page_index, page)| {

            let mut links_count = 0;
            for (link_index, link) in page.links().iter().enumerate() {
                log::info!(
                    "Page {} link {} has action of type {:?}",
                    page_index,
                    link_index,
                    link.action().map(|action| action.action_type())
                );
    
                // For links that have URI actions, output the destination URI.
    
                if let Some(action) = link.action() {
                    if let Some(uri_action) = action.as_uri_action() {
                        log::info!("Link URI destination: {:#?}", uri_action.uri())
                    }
                }
    
                links_count += 1;
            }
            log::info!("Total links count: {}", links_count);

            let mut annotations_count = 0;
            for (annotation_index, annotation) in page.annotations().iter().enumerate() {
                let annotation_text = page.text().unwrap().for_annotation(&annotation).unwrap();

                log::info!(
                    "Annotation {} is of type {:?} with text {:?} and with bounds {:?}",
                    annotation_index,
                    annotation.annotation_type(),
                    annotation_text,
                    annotation.bounds()
                );

                annotations_count += 1;
            }

            log::info!("Total annotations count: {}", annotations_count);


            log::info!(
                "This extracts the correct text: {}",
                page.objects()
                    .iter()
                    .filter_map(|object| object
                        .as_text_object()
                        .map(|object| object.text()))
                    .collect::<Vec<_>>()
                    .join(" ")
            );
        });
}

#[allow(dead_code)]
fn main() {}
