using Microsoft.AspNetCore.Mvc;

namespace Querim.Dtos
{
    public class ChapterUploadRequest
    {
        [FromForm(Name = "subjectId")]
        public int SubjectId { get; set; }

        [FromForm(Name = "title")]
        public string Title { get; set; } = string.Empty;

        [FromForm(Name = "description")]
        public string Description { get; set; } = string.Empty;

        [FromForm(Name = "file")]
        public IFormFile File { get; set; } = null!;
    }
}
