import type { ProjectArchitecture } from "../../data/projects";
import { DataFlowVisual } from "./DataFlowVisual";
import { MicroFrontendVisual } from "./MicroFrontendVisual";
import { PipelineVisual } from "./PipelineVisual";

export function ProjectArchitectureVisual({ architecture }: { architecture: ProjectArchitecture }) {
  switch (architecture.type) {
    case "microfrontend":
      return <MicroFrontendVisual architecture={architecture} />;
    case "pipeline":
      return <PipelineVisual architecture={architecture} />;
    case "dataflow":
      return <DataFlowVisual architecture={architecture} />;
    default: {
      // Exhaustiveness check — if a new architecture type is ever added to
      // the data model without a matching visual, this fails to compile.
      const _exhaustive: never = architecture;
      return _exhaustive;
    }
  }
}
