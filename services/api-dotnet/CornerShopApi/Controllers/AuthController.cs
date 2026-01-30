using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
namespace CornerShopApi.Models;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly JwtTokenService _jwt;

    public AuthController(UserManager<ApplicationUser> userManager, 
                            SignInManager<ApplicationUser> signInManager,
                            JwtTokenService jwt)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwt = jwt;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest req)
    {
        var user = new ApplicationUser{UserName = req.Email, Email = req.Email};
        var result = await _userManager.CreateAsync(user, req.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors.Select(e=> e.Description));
        }

        var token = _jwt.createToken(user);
        return Ok(new AuthResponse(token, user.Email!));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest req)
    {
        var user = await _userManager.FindByEmailAsync(req.Email);
        if(user is null) return Unauthorized("Invalid credentials");

        var result = await _signInManager.CheckPasswordSignInAsync(user, req.Password, false);
        if (!result.Succeeded)
        {
            return Unauthorized("Invalid credentials");
        }
        var token = _jwt.createToken(user);
        return Ok(new AuthResponse(token, user.Email!));
    }
}