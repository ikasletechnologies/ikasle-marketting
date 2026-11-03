/**
 * True when WebGL is running on a CPU rasteriser (SwiftShader, llvmpipe, WARP...).
 * That happens on machines whose GPU is blocklisted or unavailable (VMs, remote
 * desktops, some older laptops); full-resolution 60 fps shaders can freeze the tab there.
 */
export function isSoftwareRenderer(gl) {
  try {
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || '');
    return /swiftshader|llvmpipe|softpipe|software|basic render|warp/i.test(renderer);
  } catch {
    return false;
  }
}
