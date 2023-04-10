declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	/**
	* @param {Blob} blob
	* @returns {Promise<void>}
	*/
	export function read_pdf_links(blob: Blob): Promise<void>;
	/**
	* @param {Blob} blob
	* @param {number} index
	* @param {number} width
	* @param {number} height
	* @returns {Promise<ImageData>}
	*/
	export function get_image_data_for_page(blob: Blob, index: number, width: number, height: number): Promise<ImageData>;
	/**
	* Establishes a binding between an external Pdfium WASM module and `pdfium-render`'s WASM module.
	* This function should be called from Javascript once the external Pdfium WASM module has been loaded
	* into the browser. It is essential that this function is called _before_ initializing
	* `pdfium-render` from within Rust code. For an example, see:
	* <https://github.com/ajrcarey/pdfium-render/blob/master/examples/index.html>
	* @param {any} pdfium_wasm_module
	* @param {any} local_wasm_module
	* @param {boolean} debug
	* @returns {boolean}
	*/
	export function initialize_pdfium_render(pdfium_wasm_module: any, local_wasm_module: any, debug: boolean): boolean;
	/**
	* A callback function that can be invoked by Pdfium's `FPDF_LoadCustomDocument()` function,
	* wrapping around `crate::utils::files::read_block_from_callback()` to shuffle data buffers
	* from our WASM memory heap to Pdfium's WASM memory heap as they are loaded.
	* @param {number} param
	* @param {number} position
	* @param {number} pBuf
	* @param {number} size
	* @returns {number}
	*/
	export function read_block_from_callback_wasm(param: number, position: number, pBuf: number, size: number): number;
	/**
	* A callback function that can be invoked by Pdfium's `FPDF_SaveAsCopy()` and `FPDF_SaveWithVersion()`
	* functions, wrapping around `crate::utils::files::write_block_from_callback()` to shuffle data buffers
	* from Pdfium's WASM memory heap to our WASM memory heap as they are written.
	* @param {number} param
	* @param {number} buf
	* @param {number} size
	* @returns {number}
	*/
	export function write_block_from_callback_wasm(param: number, buf: number, size: number): number;
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly read_pdf_links: (a: number) => number;
  readonly get_image_data_for_page: (a: number, b: number, c: number, d: number) => number;
  readonly initialize_pdfium_render: (a: number, b: number, c: number) => number;
  readonly read_block_from_callback_wasm: (a: number, b: number, c: number, d: number) => number;
  readonly write_block_from_callback_wasm: (a: number, b: number, c: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbd7fb8f4ec0f64c5: (a: number, b: number, c: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h544cb0e042e59833: (a: number, b: number, c: number, d: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
declare function wasm_bindgen (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
