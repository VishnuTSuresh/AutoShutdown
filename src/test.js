var requireContext=require.context("./", true, /\.test\.ts$/);
requireContext.keys().map(requireContext)